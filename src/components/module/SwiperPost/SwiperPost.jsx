import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import styled from 'styled-components';

import NextBtn from '~/components/Base/Swiper/NextBtn';
import PrevBtn from '~/components/Base/Swiper/PrevBtn';
import SwiperPostItem from './SwiperPostItem';

const SwiperPostStyled = styled.div`
  margin-bottom: 12px;

  .swiperPost-title {
    position: relative;
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    margin: 0 auto;
    color: ${props => props.theme.color.brown};
    font-family: ${props => props.theme.font.tertiary};
    letter-spacing: 2px;
    text-shadow: 0 0 1px ${props => props.theme.color.darkBrown};
  }

  .swiperPost-gap {
    position: relative;
    margin: 0 auto 24px auto;
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    gap: 4px;
    width: 100%;

    i {
      color: #ccc;
    }
    i:first-child,
    i:last-child {
      font-size: 10px;
    }
    &::after,
    &::before {
      content: '';
      position: absolute;
      bottom: 30%;
      height: 1px;
      width: 100px;
      background-color: #ccc;
    }
    &::after {
      right: 39%;
    }
    &::before {
      left: 39%;
    }
  }

  .swiperPost-swiper {
    position: relative;

    button {
      position: absolute;
      top: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background-color: ${props => props.theme.color.brown};
      border-radius: 50%;
      color: ${props => props.theme.color.white};
      font-size: 28px;
      opacity: 0.8;
      cursor: pointer;
    }
    button:hover {
      opacity: 1;
    }

    &__btn-prev {
      left: -70px;
    }
    &__btn-next {
      right: -70px;
    }
  }
  .swiper-slide {
    width: calc((100% - 45px) / 4) !important;
  }
`;

const SwiperPost = ({ posts, title }) => {
  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <SwiperPostStyled>
      <h2 className="swiperPost-title">{title}</h2>
      <div className="swiperPost-gap">
        <i className="bx bxs-star"></i>
        <i className="bx bxs-star"></i>
        <i className="bx bxs-star"></i>
      </div>
      <div className="swiperPost-swiper">
        <Swiper spaceBetween={15} slidesPerView="auto">
          {posts &&
            posts.length &&
            posts.length > 0 &&
            posts.map(post => (
              <SwiperSlide key={post.id}>
                <SwiperPostItem post={post} />
              </SwiperSlide>
            ))}
          <NextBtn ref={nextRef} />
          <PrevBtn ref={prevRef} />
        </Swiper>
        <button
          className="swiperPost-swiper__btn-prev"
          onClick={() => {
            prevRef.current.click();
          }}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <button
          className="swiperPost-swiper__btn-next"
          onClick={() => {
            nextRef.current.click();
          }}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </SwiperPostStyled>
  );
};

SwiperPost.propTypes = {
  // moviesData: PropTypes.array.isRequired,
  // type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export { SwiperPost };
