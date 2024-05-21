import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostsContext } from "./PostsProvider";

export default function AddPostModal({ setClicked }) {
  const [show, setShow] = useState(true); // 모달 창을 열고 닫는 상태 변수
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);
  const { postId, setPostId, posts, setPosts } = useContext(PostsContext);
  const handleClose = () => setShow(false); // 모달 닫기 핸들러

  const handleSubmit = async () => {
    // 여기서 데이터를 저장하거나 처리하는 로직을 추가하세요.
    console.log("Title:", title);
    console.log("Body:", body);
    setDidSubmit(true);
    handleClose();
    await setTimeout(() => {
      setClicked(false);
      setPosts([
        {
          title: title,
          body: body,
          id: postId + 1,
          userId: 13,
          onEdit: false,
          completed: false,
        },
        ...posts,
      ]);
    }, 1000);
    setPostId((prev) => prev + 1);
    // 제출 후 모달 닫기
  };

  return didSubmit ? (
    <img
      src={`${process.env.PUBLIC_URL}/assets/completed.gif`}
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        bottom: "40px",
        right: "120px",
        border: "5px solid lightgrey",
        backdrop: "static",
        padding: didSubmit ? "0" : "20px",
        boxSizing: "border-box",
        borderRadius: "20px",
        backgroundColor: "white",
      }}
    />
  ) : (
    <Modal
      show={show}
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        bottom: "40px",
        right: "120px",
        border: "5px solid lightgrey",
        backdrop: "static",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "20px",
        backgroundColor: "white",
      }}
    >
      <Modal.Body>
        {/* 제목 입력 폼 */}
        <Form.Group controlId="postTitle">
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              border: "1px solid #ced4da",
              borderRadius: "5px",
              width: "100%",
              height: "20px",
              padding: "15px",
              boxSizing: "border-box",
            }}
          />
        </Form.Group>
        {/* 내용 입력 폼 */}
        {
          <Form.Group controlId="postBody">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter post body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{
                border: "1px solid #ced4da",
                borderRadius: "5px",
                boxSizing: "border-box",
                marginTop: "15px",
                width: "100%",
                padding: "15px",
                height: "250px",
              }}
            />
          </Form.Group>
        }
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        {/* 제출 버튼 */}
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{
            background: "rgba(240,240,240)",
            width: "100%",
            height: "30px",
            marginTop: "20px",
            boxSizing: "border-box",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "10px",
            color: "darkgrey",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ccc")}
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgba(240,240,240)")
          }
          onMouseDown={(e) => {
            e.target.style.backgroundColor = "darkgrey";
            e.target.style.color = "white";
          }}
          onMouseUp={(e) => (e.target.style.backgroundColor = "#ccc")}
        >
          done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
