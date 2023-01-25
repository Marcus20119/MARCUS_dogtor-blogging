import { doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import { db } from '~/firebase/firebase-config';
import { mobile } from '~/styles/responsive';

const ButtonReadListStyled = styled.button`
  position: fixed;
  bottom: 100px;
  right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.brown};
  color: ${props => props.theme.color.skin} !important;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.95;

  ${mobile(css`
    right: 20px;
    bottom: 170px;
  `)}

  :hover {
    opacity: 0.8;
  }
`;

const ButtonReadList = ({ userId, postData }) => {
  const { slug } = useParams();
  const [isAlreadyInReadList, setIsAlreadyInReadList] = useState(false);
  useEffect(() => {
    setIsAlreadyInReadList(
      (postData?.usersReading && postData.usersReading.includes(userId)) ||
        false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const [forceDisable, setForceDisable] = useState(false);

  const handleAddToReadList = async () => {
    // Nếu như reader chưa add vào read list thì add, không thì thông báo đã add rồi
    if (!isAlreadyInReadList) {
      try {
        setForceDisable(true);
        let newUsersReading = [];
        if (postData?.usersReading && postData.usersReading.length > 0) {
          newUsersReading = [...postData.usersReading];
          newUsersReading.push(userId);
        } else {
          newUsersReading = [userId];
        }
        await updateDoc(doc(db, 'posts', postData.id), {
          ...postData,
          usersReading: newUsersReading,
        });

        toast.success(`Added to Read List Successfully!`, {
          autoClose: 2000,
          delay: 300,
        });
        setForceDisable(false);
        setIsAlreadyInReadList(true);
      } catch (err) {
        console.log(err);
        toast.error(`Error: ${err.code.split('/')[1]}`, {
          autoClose: 2000,
          delay: 300,
        });
      }
    } else {
      toast.info(`Already in your Read List`, {
        autoClose: 2000,
        delay: 300,
      });
    }
  };
  return (
    <ButtonReadListStyled
      title="Add to Read List"
      disabled={forceDisable}
      onClick={handleAddToReadList}
    >
      <i className="bx bxs-book-add"></i>
    </ButtonReadListStyled>
  );
};

export default ButtonReadList;
