import { Suspense } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import LoadingPage from './pages/LoadingPage';
import PrintPostPage from './pages/post/PrintPostPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Common
const LatestPage = lazy(() => import('./pages/LatestPage'));
const PopularPage = lazy(() => import('./pages/PopularPage'));
const FavoritePage = lazy(() => import('./pages/FavoritePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const PostPage = lazy(() => import('./pages/post/PostPage'));
const FavoritePostsPage = lazy(() => import('./pages/user/FavoritePostsPage'));
const UserInfoPage = lazy(() => import('./pages/user/UserInfoPage'));

// Admin
const MangePostsPageAdmin = lazy(() =>
  import('./pages/user/admin/ManagePostsPageAdmin/ManagePostsPageAdmin')
);
const ManageUsersPageAdmin = lazy(() =>
  import('./pages/user/admin/ManageUsersPageAdmin/ManageUsersPageAdmin')
);
const ManageCategoriesPageAdmin = lazy(() =>
  import(
    './pages/user/admin/ManageCategoriesPageAdmin/ManageCategoriesPageAdmin'
  )
);
const EditPostPageAdmin = lazy(() =>
  import('./pages/user/admin/EditPostPageAdmin')
);
const EditUserPageAdmin = lazy(() =>
  import('./pages/user/admin/EditUserPageAdmin')
);
const AddPostPageAdmin = lazy(() =>
  import('./pages/user/admin/AddPostPageAdmin')
);
const AddUserPageAdmin = lazy(() =>
  import('./pages/user/admin/AddUserPageAdmin')
);
const AddCategoryPageAdmin = lazy(() =>
  import('./pages/user/admin/AddCategoryPageAdmin')
);

// Writer
const AllPostsPageWriter = lazy(() =>
  import('./pages/user/writer/AllPostsPageWriter/AllPostsPageWriter')
);
const AddPostPageWriter = lazy(() =>
  import('./pages/user/writer/AddPostPageWriter')
);
const EditPostPageWriter = lazy(() =>
  import('./pages/user/writer/EditPostPageWriter')
);

// Reader
const ReadListPageReader = lazy(() =>
  import('./pages/user/reader/ReadListPageReader/ReadListPageReader')
);

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/post/print/:slug" element={<PrintPostPage />} />

        <Route path="/user" element={<UserLayout />}>
          <Route path="user-info" element={<UserInfoPage />} />

          <Route path="admin">
            <Route path="all-posts" element={<MangePostsPageAdmin />} />
            <Route path="all-users" element={<ManageUsersPageAdmin />} />
            <Route
              path="all-categories"
              element={<ManageCategoriesPageAdmin />}
            />
            <Route path="edit-post/:id" element={<EditPostPageAdmin />} />
            <Route path="edit-user/:id" element={<EditUserPageAdmin />} />
            <Route path="add-post" element={<AddPostPageAdmin />} />
            <Route path="add-user" element={<AddUserPageAdmin />} />
            <Route path="add-category" element={<AddCategoryPageAdmin />} />
            <Route path="favorite-posts" element={<FavoritePostsPage />} />
            {/* <Route path="user-info" element={<UserInfoPage />} /> */}
          </Route>
          <Route path="writer">
            <Route path="all-posts" element={<AllPostsPageWriter />} />
            <Route path="add-post" element={<AddPostPageWriter />} />
            <Route path="favorite-posts" element={<FavoritePostsPage />} />
            <Route path="edit-post/:id" element={<EditPostPageWriter />} />
            {/* <Route path="user-info" element={<UserInfoPage />} /> */}
          </Route>
          <Route path="reader">
            <Route path="read-list" element={<ReadListPageReader />} />
            <Route path="favorite-posts" element={<FavoritePostsPage />} />
          </Route>
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Navigate replace to="/latest" />} />
          <Route path="latest" element={<LatestPage />} />
          <Route path="popular" element={<PopularPage />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route path="post/:slug" element={<PostPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
