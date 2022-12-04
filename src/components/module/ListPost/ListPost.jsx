import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import styled from 'styled-components';

import NextBtn from '~/components/Base/Swiper/NextBtn';
import PrevBtn from '~/components/Base/Swiper/PrevBtn';
import ListPostItem from './ListPostItem';

const ListPostStyled = styled.div`
  .listPost-title {
    font-size: 28px;
    line-height: 32px;
    font-weight: 900;
    margin-bottom: 12px;
    font-family: ${props => props.theme.font.tertiary};
    color: ${props => props.theme.color.brown};
    letter-spacing: 1px;
    text-shadow: 0 0 1px ${props => props.theme.color.darkBrown};
  }
  .listPost-swiper {
    position: relative;

    &__btn {
      position: absolute;
      top: -44px;
      right: 0;
      display: inline-flex;
      justify-content: center;
      gap: 8px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        background-color: ${props => props.theme.color.brown};
        border-radius: 50%;
        color: ${props => props.theme.color.white};
        font-size: 20px;
        opacity: 0.8;
        cursor: pointer;
      }
      button:hover {
        opacity: 1;
      }
    }
  }
  .swiper-slide {
    width: calc((100% - 45px) / 4) !important;
  }
`;

const ListPost = ({ posts, title }) => {
  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <ListPostStyled>
      <h3 className="listPost-title">{title}</h3>
      <div className="listPost-swiper">
        <Swiper spaceBetween={15} slidesPerView="auto">
          {posts &&
            posts.length &&
            posts.length > 0 &&
            posts.map(post => (
              <SwiperSlide key={post.id}>
                <ListPostItem post={post} />
              </SwiperSlide>
            ))}
          <NextBtn ref={nextRef} />
          <PrevBtn ref={prevRef} />
        </Swiper>
        <div className="listPost-swiper__btn">
          <button
            onClick={() => {
              prevRef.current.click();
            }}
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              nextRef.current.click();
            }}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>
      </div>
    </ListPostStyled>
  );
};

ListPost.propTypes = {
  // moviesData: PropTypes.array.isRequired,
  // type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export { ListPost };
