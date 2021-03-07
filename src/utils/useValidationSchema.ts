import { setIn } from "final-form"
import { useMemo } from "react"
import * as yup from "yup"

/**
 * Sets the `innerError.message` in an `errors` object at the key
 * defined by `innerError.path`.
 * @param errors The object to set the error in.
 * @param innerError A `yup` field error.
 * @returns The result of setting the new error message onto `errors`.
 */
const setInError = (
  errors: Object,
  innerError: { path: string; message: string }
) => {
  return setIn(errors, innerError.path, innerError.message)
}

/**
 * Empty object map with no prototype. Used as default
 * value for reducing the `err.inner` array of errors
 * from a `yup~ValidationError`.
 */
const emptyObj: Object = Object.create(null)

/**
 * Takes a `yup` validation schema and returns a function that expects
 * a map of values to validate. If the validation passes, the function resolves to `undefined`
 * (signalling that the values are valid). If the validation doesn't pass, it resolves
 * to a map of invalid field names to errors.
 * @param schema `yup` schema definition.
 * @returns An async function that expects some `values`
 *  and resolves to either `undefined` or a map of field names to error messages.
 */
export const makeValidate = (
  schema: yup.ObjectSchema<any>,
  sync: boolean
): ((values: Object) => Promise<Object>) | ((values: Object) => Object) => {
  if (sync) {
    return function validate(values: Object) {
      try {
        schema.validateSync(values, { abortEarly: false })
      } catch (err) {
        return err.inner.reduce(setInError, emptyObj)
      }
    }
  } else {
    return async function validate(values: Object) {
      try {
        await schema.validate(values, { abortEarly: false })
      } catch (err) {
        return err.inner.reduce(setInError, emptyObj)
      }
    }
  }
}

/**
 * Retrieve a validation function for the provided schema
 * @param schema Yup object schema
 * @param sync If validation needs to be done synchronously
 * @returns Validation function, which returns: dictionary of errors `{field: "errorMessage"}` OR `undefined` if no errors were found
 */
function useValidationSchema(
  schema: yup.ObjectSchema<any>,
  sync: boolean = true
) {
  const validate = useMemo(() => makeValidate(schema, sync), [schema, sync])
  return validate
}

export default useValidationSchema
