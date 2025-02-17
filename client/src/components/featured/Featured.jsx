import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {

  const { data, loading, error } = useFetch("/hotels/countByCity?cities=Đà Lạt,Đà Nẵng,Nha Trang,TP.Hồ Chí Minh,Hà Nội");




  return (
    <div className="featured">
      {loading ? (
        <div className="loading">Loading please wait...</div>
      ) : (
        <div className="featuredItems">
          <div className="featuredItem">

        <img
          src="/images/dalat.jpg"


          alt=""
          className="featuredImg"
        />

        <div className="featuredTitles">
          <h1>Đà Lạt</h1>
          <h2>{data[0]} khách sạn</h2>
        </div>
      </div>

        <div className="featuredItem">
          <img
            src="/images/danang.jpg"


            alt=""
            className="featuredImg"
          />

          <div className="featuredTitles">
            <h1>Đà Nẵng</h1>
            <h2>{data[1]} khách sạn</h2>
          </div>
        </div>

        <div className="featuredItem">
          <img
            src="/images/nhatrang.jpg"


            alt=""
            className="featuredImg"
          />

          <div className="featuredTitles">
            <h1>Nha Trang</h1>
            <h2>{data[2]} khách sạn</h2>
          </div>
        </div>

        <div className="featuredItem">
          <img
            src="/images/tphcm.jpg"


            alt=""
            className="featuredImg"
          />

          <div className="featuredTitles">
            <h1>TP.Hồ Chí Minh</h1>
            <h2>{data[3]} khách sạn</h2>
          </div>
        </div>

        <div className="featuredItem">
          <img
            src="/images/hn.jpg"


            alt=""
            className="featuredImg"
          />

          <div className="featuredTitles">
            <h1>Hà Nội</h1>
            <h2>{data[4]} khách sạn</h2>
          </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Featured;
