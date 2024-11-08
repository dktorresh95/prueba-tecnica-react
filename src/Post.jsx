import { useState } from "react";
import { Modal } from "antd";

export const Post = ({ props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchDataComments = async (id) => {
    try {
      const response = await fetch(
        `https://dummyapi.io/data/v1/post/${id}/comment`,
        {
          method: "GET",
          headers: {
            "app-id": "631251d815c778ad0b7301b6 ",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const result = await response.json();
      setComments(result.data);
      showModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-6">
        <div className="card" onClick={() => fetchDataComments(props.id)}>
          <img src={props.image} max-width={300} height={400} />
          <br />
          {props.tags.map((tag) => (
            <span>{tag} </span>
          ))}
          <p>
            {props.owner.firstName} {props.owner.lastName}
          </p>
        </div>
      </div>
      <Modal
        title="Comentarios"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {comments.length > 0 ? (
          comments.map((comment) => <p> {comment.message} </p>)
        ) : (
          <h2>No hay comentarios</h2>
        )}
      </Modal>
    </>
  );
};
