import React, { useEffect, useState } from "react";
import "./BioCard.css";
import { Modal } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getTheName } from "../../Utils/Utils";
import { dispatchAddBio, dispatchGetBio } from "../../Store/Action/JobsAction";
import { ThreeDots } from "react-loader-spinner";

function BioCard() {
  const dispatch = useDispatch();

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const { bioData } = useSelector((state) => state.jobs);

  const [open, setOpen] = useState(false);
  const [addBio, setAddBio] = useState("");
  const [bio, setBio] = useState("");

  const decodeToken = jwtDecode(token);
  const userName = getTheName(decodeToken.name);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setAddBio(bioData.bio);
    setBio(bioData.bio);
  }, [bioData.bio]);

  useEffect(() => {
    getBio();
  }, []);

  const getBio = () => {
    dispatch(dispatchGetBio(token));
  };

  const handleAddBio = () => {
    const data = {
      user_id: decodeToken.id,
      bio,
    };
    if (bio) {
      dispatch(dispatchAddBio(token, data));
      setAddBio(bio);
      setOpen(false);
    }
  };

  const handleCancelBio = () => {
    setOpen(false);
  };

  return (
    <>
      {bioData.loading && (
        <div className="bio-card">
          <ThreeDots
            visible={true}
            height="35"
            width="35"
            color="#343434"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {!bioData.loading && bioData.isSuccess && (
        <div className="user-bio-cards">
          <img
            className="profile-icon"
            src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1707051044/profile_ft7f1g.png"
            alt="profile icon"
          />
          <div className="bio-cards">
            <h1 className="user-name">{userName}</h1>
            {bioData.bio && !bioData.loading ? (
              <>
                <p className="user-bio">{addBio}</p>
                <button onClick={handleOpen} className="bio-button-edit">
                  Edit
                </button>
              </>
            ) : (
              <button onClick={handleOpen} className="bio-button">
                Add bio
              </button>
            )}
          </div>
        </div>
      )}
      {!bioData.isSuccess && !bioData.loading && (
        <div className="bio-card">
          <button className="bio-retry-button" onClick={() => getBio()}>
            Retry
          </button>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="popup-container">
          <h1 className="popup-title">Add Bio</h1>
          <div className="popup-card">
            <textarea
              onChange={(e) => setBio(e.target.value)}
              maxLength={80}
              value={bio}
              placeholder="Add bio"
              rows={3}
              className="add-bio-input"
            />
            <div className="bio-buttons-card">
              <button
                className="cancel-button bio-button"
                onClick={handleCancelBio}
              >
                Cancel
              </button>
              <button className="add-button bio-button" onClick={handleAddBio}>
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BioCard;
