import axios from "axios";


function deletePost(data) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/post/delete',
        headers: { 
          'Content-Type': 'text/plain'
        },
        data : JSON.stringify(data)
      };
      
      axios.request(config)
      .then((response) => {
        if(response.status == 200) {
            alert("Xóa thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

export { deletePost };