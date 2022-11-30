import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import { useForm } from "react-hook-form";
import {
  AnchorMode,
  PostConditionMode,
  standardPrincipalCV,
callReadOnlyFunction
  // stringUtf8CV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import { principalCV } from "@stacks/transactions/dist/clarity/types/principalCV";
import { useState, useEffect, useCallback } from "react";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

export default function Afford() {
  const { doContractCall } = useConnect();
  const [txid, setTxid] = useState(0);
  const [nft, setNft] = useState(0);
  const [number, setNumber] = useState(0)
  const [modalShow, setModalShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
  } = useForm();
  function mint(recipient) {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST3921Q755Q8K3MAGBQX2P5BX8PA1JEA53AFJYSTS",
      contractName: "affordable_owner",
      functionName: "mint",
      functionArgs: [principalCV(recipient)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        setNumber(data.txId)
        // console.log("onFinish:", data);
        // window
        //   .open(
        //  `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`
        //     // "_blank"
        //   )
        //   .focus();
          setModalShow(true)
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }
  const getTotalNft = useCallback(async () => {

    if (userSession.isUserSignedIn()) {
      const userAddress = userSession.loadUserData().profile.stxAddress.testnet
      const options = {
          contractAddress: "ST3921Q755Q8K3MAGBQX2P5BX8PA1JEA53AFJYSTS",
          contractName: "affordable_owner",
          functionName: "get-total-supply",
          network: new StacksTestnet(),
          functionArgs: [standardPrincipalCV(userAddress)],
          senderAddress: userAddress
      };

      const result = await callReadOnlyFunction(options);
      console.log(result.value);
      setTxid(Number(result.value))
      if (result.value) {
        // setHasPosted(true)
        
      }
    }
    
  });
  useEffect(() => {
    getTotalNft();
  }, [])
  const getTotalSupply = useCallback(async () => {

    if (userSession.isUserSignedIn()) {
      const userAddress = userSession.loadUserData().profile.stxAddress.testnet
      const options = {
          contractAddress: "ST3921Q755Q8K3MAGBQX2P5BX8PA1JEA53AFJYSTS",
          contractName: "affordable_owner",
          functionName: "get-token-count",
          network: new StacksTestnet(),
          functionArgs: [principalCV(userAddress)],
          senderAddress: userAddress
      };

      const result = await callReadOnlyFunction(options);
      console.log(result.value);
      setNft(Number(result.value))
      if (result.value) {
        // setHasPosted(true)
        
      }
    }
    
  });
  useEffect(() => {
    getTotalSupply();
  }, [])
  if (!userSession.isUserSignedIn()) {
    return null;
  }
  const onSubmit = () => { 
    mint(userSession.loadUserData().profile.stxAddress.testnet)
  };
   
  
  return (
    
    <div className="container-fluid ">
      <div className="container form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center">AFFORDABLE HOUSING OWNERS</h3>
          <div className="forminput">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("name", { required: "First Name is Required" })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
          <div className="forminput">
            <label> Last Name </label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: "Last Name is Required" })}
              onKeyUp={() => {
                trigger("lastname");
              }}
            />
            {errors.lastname && (
              <small className="text-danger">{errors.lastname.message}</small>
            )}
          </div>
          <div className="forminput">
            <label>Property Address (offering) </label>
            <input
              type="text"
              placeholder="Property Address"
              {...register("Property", {
                required: "Property Address is Required",
              })}
              onKeyUp={() => {
                trigger("Property");
              }}
            />
            {errors.Property && (
              <small className="text-danger">{errors.Property.message}</small>
            )}
          </div>
          <div className="forminput">
            <label>
              Total Unit/s Available (Unit Number/s per property) + dates vacant
            </label>
            <input type="number" onKeyDown={(e) =>["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} placeholder="Unit/s Available" />
            <br />
            <input
              type="date" min={new Date().toISOString().split('T')[0]}
              {...register("date", { required: "Date is Required" })}
              onKeyUp={() => {
                trigger("date");
              }}
            />
            {errors.date && (
              <small className="text-danger">{errors.date.message}</small>
            )}
          </div>
          <div className="forminput">
            <label>Voucher Types Accepted</label>
            <select>
              <option disabled selected>
                Select Voucher Type{" "}
              </option>
              <option value="HRA">HRA</option>
              <option value=" CityPHEPS"> CityPHEPS</option>
              <option value="Section 8">Section 8</option>
            </select>
          </div>
          <div className="forminput">
            <label>Unit Type/s</label>
            <select>
              <option disabled selected>
                Select Unit Type/s
              </option>
              <option value="Unit Type/s">Unit Type/s</option>
              <option value="1BR">1BR</option>
              <option value="2BR">2BR</option>
              <option value="etc..">etc..</option>
            </select>
          </div>
          <div className="forminput">
            <label>Rent Amount/s</label>
            <input
              type="number"
              placeholder="Rent Amount/s"
              {...register("Rent", { required: "Rent Amount is Required" })}
              onKeyUp={() => {
                trigger("Rent");
              }}
            />
            {errors.Rent && (
              <small className="text-danger">{errors.Rent.message}</small>
            )}
          </div>
          <div className="forminput">
            <label>
              Unit Inspection Walkthrough Video Uploaded (PASS w/
              Timestamp)Inspection Walkthrough Video Viewed (PASSED w/
              Timestamp)
            </label>
            <input
              type="text"
              placeholder="Unit Inspection"
              {...register("Voucher", {
                required: "Voucher Amount is Required",
              })}
              onKeyUp={() => {
                trigger("Voucher");
              }}
            />
            {errors.Voucher && (
              <small className="text-danger">{errors.Voucher.message}</small>
            )}
          </div>
          <div
            className="forminput"
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <button type="submit">Submit</button>
            
      <MyVerticallyCenteredModal
      link={number}
        show={modalShow}
        onHide={() => setModalShow(false)}
        
      />
          </div>
          <p style={{color:"#fff"}}>Total Supply : {txid}</p>
          <p style={{color:"#fff"}}>Total NFT's Minted : {nft}</p>
        </form>
      </div>
    </div>
  );
};


