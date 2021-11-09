import { createPortal } from "react-dom";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Button } from "@/components/index";

const DeleteOrderModal = ({ setDeletePost, deletePost, handleDeletePost }) => {
  let { t } = useTranslation();
  return createPortal(
    <Wrapper>
      <Content>
        <p>
          {t("common:confirmDeletePost")}:<span> {deletePost.slug}</span>
        </p>
        <div className="buttons">
          <Button
            onClick={() => {
              handleDeletePost(deletePost._id);
              setDeletePost(null);
            }}
          >
            {t("common:yes")}
          </Button>
          <Button variant="dark" onClick={() => setDeletePost(null)}>
            {t("common:no")}
          </Button>
        </div>
      </Content>
    </Wrapper>,
    document.querySelector("#modal")
  );
};
export default DeleteOrderModal;

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
  .buttons {
    button:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing.xs};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    span {
      display: block;
    }
  }
`;
