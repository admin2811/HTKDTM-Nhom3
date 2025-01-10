// import React from 'react';
// import './Community.css';
// import Navbar from "../common/navbar/Navbar";
// import Sidebar from "../common/sidebar/Sidebar";

// const Community = () => {
//   return (
//     <div className="community">
//       <Sidebar />
//       <div className="container-community">
//         <Navbar />
//         <div className="postes">
//           <h1>Cộng đồng thảo luận</h1>
          
//           {/* Nhúng iframe Facebook */}
//           <iframe 
//             src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0T1FDVjHyYiRDwZ7h1aJ8c5jke1ni1ik7SbL9tQ3Awrpjnx3D6vLo7r47qp9Msk28l%26id%3D61571560507383&show_text=true&width=500" 
//             width="500" 
//             height="157" 
//             style={{ border: 'none', overflow: 'hidden' }} 
//             scrolling="no" 
//             frameBorder="0" 
//             allowFullScreen={true} 
//             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Community;


import React, { useEffect } from 'react';
import './Community.css';
const Community = () => {
  useEffect(() => {
    // Thêm Facebook SDK khi component được mount
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
    document.body.appendChild(script);

    // Đảm bảo SDK được khởi tạo sau khi script được tải
    script.onload = () => {
      if (window.FB) {
        window.FB.init({
          xfbml: true,
          version: 'v17.0'
        });
        window.FB.XFBML.parse();
      }
    };
  }, []);

  return (
    <div className="community">
      <div className="container-community">
        <div className='postes'>
          <h1>Cộng đồng thảo luận</h1>
          {/* Hiển thị các bài viết nhúng */}
          <div className="fb-posts-container">
            <div className="fb-post-wrapper">
              <div className="fb-post items-center justify-center"
                  data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid0T1FDVjHyYiRDwZ7h1aJ8c5jke1ni1ik7SbL9tQ3Awrpjnx3D6vLo7r47qp9Msk28l&id=61571560507383"
                  data-width="1500px">
              </div>
            </div>
            <div className="fb-post-wrapper">
              <div className="fb-post"
                  data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid0367EM4Yj3KNvKmhpFfLn7nNPiMLms4AYRuGRXk5Hxmq8Dw2DWCge23GxpEsXHhHcpl&id=61571560507383"
                  data-width="1500px">
              </div>
            </div>

            <div className="fb-post-wrapper">
              <div className="fb-post"
                data-href="https://www.facebook.com/hocieltscungprep/posts/pfbid02JiinZEqey79K8bzA6hKAYtSrRdoSn9sr24z1qR2T8F3MXbz9FZTN9stGnHpwXgu1l"
                data-width="1500px">
              </div>
            </div>

            <div className="fb-post-wrapper">
              <div className="fb-post"
                data-href="https://www.facebook.com/hocieltscungprep/posts/pfbid0Rf3zH6BYWpifdh9gcFzcJiAmMwN8FDPWWUMngWiwevBjN7Qk2HnFoyRmVuK5Fbi3l"
                data-width="1500px">
              </div>
            </div>

            <div className="fb-post-wrapper">
              <div className="fb-post"
                data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid0fz99RPiTQYVucNDJUZvVypc3Waa5ZdoXwGz7ZvAwr5kPzYAmLKt5AE88h5YdTbKQl&id=61566967260978"
                data-width="1500px">
              </div>
            </div>

            <div className="fb-post-wrapper">
              <div className="fb-post"
                data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid02BmxJmoNq9AmKBaNSGqJ6caemzVEnMtpbF545kmHsG1rePXY7MFnvK2w3bMTtnXYzl&id=61566967260978"
                data-width="1500px">
              </div>
            </div>

            <div className="fb-post-wrapper">
              <div className="fb-post"
                data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid0oY5EU6CiAgSuyqjSH7gRh9RqGKrXdGAvt1QEWHMqtHnUM6hX1cso4rhn79ug1fytl&id=61566967260978"
                data-width="1500px">
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;
