import { deleteDoc, doc } from 'firebase/firestore';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Table, IconButton, PostCell, StatusTag } from '~/components/table';
import { db } from '~/firebase/firebase-config';
import { useMultiDocsRealtime } from '~/hooks';
import { EyeIcon, TrashIcon, WriteIcon } from '~/icons';

const AllPostTableHeadStyled = styled.thead`
  .allPage-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 400px;
    }
  }
`;
const AllPostTableBodyStyled = styled.tbody`
  .allPage-postId {
    text-align: center !important;
  }
  .allPage-postAction {
    div {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  .allPage-postAuthor {
    height: 100%;
    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
`;

const AllPostPageWriterTableSection = ({ query }) => {
  const posts = useMultiDocsRealtime({ query: query });
  const handleDeletePost = async postId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, 'posts', postId));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };
  return (
    <Table>
      <AllPostTableHeadStyled>
        <tr className="allPage-firstRow">
          <th>No.</th>
          <th>Post</th>
          <th>Author</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </AllPostTableHeadStyled>
      <AllPostTableBodyStyled>
        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => (
            <tr key={post.id}>
              <td className="allPage-postId">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </td>
              <td>
                <PostCell postData={post} />
              </td>
              <td className="allPage-postAuthor">
                <span>{post.author}</span>
              </td>
              <td className="allPage-postStatus">
                <StatusTag status={post.status} />
              </td>
              <td className="allPage-postAction">
                <div>
                  <IconButton>
                    <EyeIcon />
                  </IconButton>
                  <IconButton>
                    <WriteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePost(post.id)}>
                    <TrashIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        {!posts ||
          (posts.length === 0 && (
            <tr>
              <td colSpan="5">
                You still do not have any posts about this section yet!
              </td>
            </tr>
          ))}
      </AllPostTableBodyStyled>
    </Table>
  );
};

export default AllPostPageWriterTableSection;
