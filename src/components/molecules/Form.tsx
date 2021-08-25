import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  ForwardedRef,
  Ref,
} from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";
import { useImperativeHandle } from "react";

interface FormProps<T = any> {
  onValid: any;
  onInvalid: any;
  onChange: (values: any) => void;
}
interface FormPropsGeneric<T> {
  onValid: SubmitHandler<T>;
  onInvalid: SubmitErrorHandler<T>;
  onChange: (values: T) => void;
}

export interface FormHandle<T = any> {
  onSubmit: () => void;
}

function FormGeneric<T>(
  props: any,
  ref: ForwardedRef<FormHandle<T>>
) {
  const { ...methods } = useForm<T>();

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      methods.handleSubmit(props.onValid, props.onInvalid)();
    },
  }));

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
const FormWithRef = forwardRef(FormGeneric);

type GenericFormProps<T> = FormPropsGeneric<T> & { formRef: Ref<FormHandle<T>> };
function Form<T>({ formRef, children,...props }: PropsWithChildren<GenericFormProps<T>>) {
  return <FormWithRef ref={formRef} {...props}>{children}</FormWithRef>;
}

export default Form;
