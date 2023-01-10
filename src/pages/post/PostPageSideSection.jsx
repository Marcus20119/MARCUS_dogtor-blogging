import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import { SidePost } from '~/components/module/SidePost';
import { db } from '~/firebase/firebase-config';
import { useMultiDocs } from '~/firebase/funcs';

const PostPageSideSection = ({ postData, renderCondition }) => {
  const postsSideSectionQuery = useMemo(() => {
    console.log('rerender', postData.id);
    return query(
      collection(db, 'posts'),
      where('status', '==', 1),
      where('category', '==', postData.category),
      where('id', '!=', postData.id),
      orderBy('id', 'desc'),
      limit(3)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData.id, renderCondition]);
  const posts = useMultiDocs({
    query: postsSideSectionQuery,
    renderCondition: [postsSideSectionQuery],
  });
  console.log('posts', posts);

  return <SidePost posts={posts} title="RELEVANT" />;
};

export default PostPageSideSection;
