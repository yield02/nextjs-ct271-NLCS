import axios from "axios";
import { toast } from "react-toastify";


function deletePostTemp(data) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/post/delete',
        headers: { 
          'Content-Type': 'text/plain'
        },
        data : JSON.stringify({...data, deleteTemp: true})
      };
      
      axios.request(config)
      .then((response) => {
        if(response.status == 200) {
          toast.success("Ẩn bài viết thành công!!!");
        }
      })
      .catch((error) => {
        toast.error("Ẩn bài viết thất bại!!!");
        console.log(error);
      });
}

export { deletePostTemp };