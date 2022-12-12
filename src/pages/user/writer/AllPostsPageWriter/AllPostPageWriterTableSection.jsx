import { deleteDoc, doc } from 'firebase/firestore';
import { Fragment } from 'react';
import Swal from 'sweetalert2';

import { Table, IconButton, PostCell, StatusTag } from '~/components/table';
import { db } from '~/firebase/firebase-config';
import { useMultiDocsRealtime } from '~/hooks';
import { EyeIcon, TrashIcon, WriteIcon } from '~/icons';

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
    <Fragment>
      {posts && posts.length > 0 && (
        <Table>
          <thead>
            <tr className="allPage-firstRow">
              <th>No.</th>
              <th>Post</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td className="allPage-postId">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td>
                  <PostCell postData={post} />
                </td>
                <td className="allPage-postAuthor">{post.author}</td>
                <td className="allPage-postStatus">
                  <StatusTag status={post.status} />
                </td>
                <td className="allPage-postAction">
                  <IconButton>
                    <EyeIcon />
                  </IconButton>
                  <IconButton>
                    <WriteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePost(post.id)}>
                    <TrashIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default AllPostPageWriterTableSection;
