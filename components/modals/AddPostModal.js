import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { titleClientValidation, textClientValidation } from "@/lib/index";
import { Form, Field } from "react-final-form";
import { createPostFetch } from "@/data/index";
import { Button } from "@/components/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddPostModal = ({ setModalActive, posts, mutate, mutateRedirection }) => {
  let { t } = useTranslation();
  const router = useRouter();
  let targetElement = useRef(null);

  const onSubmit = async (values) => {
    try {
      const res = await createPostFetch(values);
      if (res.ok) {
        const json = await res.json();
        mutateRedirection ? router.push("/") : mutate([json, ...posts]),
          setModalActive(false);
      } else if (res.status === 429) {
        toast.error(t("common:spamAlert"));
      } else if (res.status === 401) {
        toast.error(t("common:requiredIp"));
      } else if (res.status === 400) {
        toast.error(t("common:bodyInvalid"));
      } else {
        toast.error(t("common:createPostError"));
      }
    } catch (err) {
      toast.error(t("common:serverError"));
    }
  };

  useEffect(() => {
    disableBodyScroll(targetElement);
    return () => clearAllBodyScrollLocks();
  }, []);

  return createPortal(
    <Wrapper ref={targetElement}>
      <Content>
        <h2>{t("common:addPost")}</h2>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting }) => (
            <FormWrapper>
              <form noValidate onSubmit={handleSubmit} id="addPost">
                <Field
                  name="title"
                  validate={(value) => titleClientValidation(value, t)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor={"title"}>{t("common:title")}</label>
                      <input
                        {...input}
                        id="title"
                        type="text"
                        placeholder={t("common:titlePlaceholder")}
                      />
                      {meta.error && meta.touched && (
                        <Error>
                          <p>{meta.error}</p>
                        </Error>
                      )}
                    </div>
                  )}
                </Field>
                <Field
                  name="text"
                  validate={(value) => textClientValidation(value, t)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor={"text"}>{t("common:text")}</label>
                      <textarea
                        {...input}
                        id="text"
                        placeholder={t("common:textPlaceholder")}
                      />
                      {meta.error && meta.touched && (
                        <Error>
                          <p>{meta.error}</p>
                        </Error>
                      )}
                    </div>
                  )}
                </Field>
              </form>
              <div className="buttons">
                <Button type="submit" disabled={submitting} form={"addPost"}>
                  {t("common:send")}
                </Button>
                <Button variant="dark" onClick={() => setModalActive(false)}>
                  {t("common:close")}
                </Button>
              </div>
            </FormWrapper>
          )}
        />
      </Content>
    </Wrapper>,
    document.querySelector("#modal")
  );
};
export default AddPostModal;

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: darken 0.5s forwards ease;
  @keyframes darken {
    from {
      background: rgba(0, 0, 0, 0);
    }
    to {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.spacing.sm};
  width: 75%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.md};
  animation: fadein 0.5s ease;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const FormWrapper = styled.div`
  form {
    & > div {
      display: flex;
      flex-direction: column;
      margin-bottom: ${({ theme }) => theme.spacing.md};
      label {
        display: flex;
        margin-bottom: ${({ theme }) => theme.spacing.xs};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
      }
      textarea {
        min-height: 200px;
        resize: none;
      }
      input,
      textarea {
        z-index: 1;
      }
    }
  }
  .buttons {
    button:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing.xs};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const Error = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-bottom-right-radius: ${({ theme }) => theme.spacing.xs};
  border-bottom-left-radius: ${({ theme }) => theme.spacing.xs};
  position: relative;
  top: -2px;
  background-color: ${({ theme }) => theme.colors.gray.dark};
`;
