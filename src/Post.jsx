import { useState } from "react";
import { Modal } from "antd";
import { Button } from "antd";
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
      <div className="col-3 my-4">
        {props.id ? (
          <div className="card">
            <img src={props.image} />
            <br />

            <div className="container-tag mb-3">
              <span>
                <b>Tags: </b>
              </span>
              {props.tags.map((tag) => (
                <span key={tag}>{tag} </span>
              ))}
            </div>
            <p>
              <b>Autor: </b> {props.owner.firstName} {props.owner.lastName}
            </p>

            <Button type="primary" onClick={() => fetchDataComments(props.id)}>Ver comentarios</Button>
          </div>
        ) : (
          <h2>No hay resultados</h2>
        )}
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
          <span>No hay comentarios</span>
        )}
      </Modal>
    </>
  );
};
