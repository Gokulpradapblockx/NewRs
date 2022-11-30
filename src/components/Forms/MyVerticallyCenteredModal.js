import Modal from "react-bootstrap/Modal";
// import {txId from "./Afford";
// import {data1} from "./Afford";

function MyVerticallyCenteredModal(props) {
  const transactionsLink = `https://explorer.stacks.co/txid/${props.link}?chain=testnet`;
  console.log(props.link);
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Transaction details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>To check your transaction on stacks explorer...</h4>

        <a
          style={{
            textDecoration: "none",
            backgroundColor: "#f37029",
            padding: "5px 10px",
            color: "#fff",
            border: "1px solid #000",
            borderRadius: "10px",
          }}
          target="_blank"
          href={transactionsLink}
          rel="noreferrer"
        >
          Click here
        </a>
        {/* <p>{props.txId}</p> */}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
