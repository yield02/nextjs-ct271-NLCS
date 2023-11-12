import axios from "axios";



const fetchUpdateStatus = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/post/update',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({...data, manager: true})
  };
  
  axios.request(config)
  .then((response) => {
      if(response.status == 200) {
        alert("Thành công");
      }
  })
  .catch((error) => {
    console.log(error);
  });
}

const fetchDeletePost = (data, setData) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/post/delete',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({...data, manager: true})
  };
  
  axios.request(config)
  .then((response) => {
      if(response.status == 200) {
        setData(prev => {
          const dataUpdate = prev.filter(item => item._id != data._id)
          console.log(dataUpdate);
          return dataUpdate;
        })
        alert("Thành công");
      }
  })
  .catch((error) => {
    console.log(error);
  });
} 








const updateStatus = (setData = ()=>{}, _id, newStatus, reason) => {
  setData(prev => {
    const updateData = prev.map(item => {
      if(item._id == _id) {
        return {
          ...item,
          status: {reason, status: newStatus}
        }
      }
      return item;
    });
    return updateData;
  })
}

const findPostWithName = (name, setData, manager=false) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/post/findWithName',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({name, manager: true})
  };
  
  axios.request(config)
  .then((response) => {
      if(response.status == 200) {
        setData((prev) => ([...response.data]))
        alert("Thành công");
      }
  })
  .catch((error) => {
    console.log(error);
  });
}






export { updateStatus, fetchUpdateStatus, fetchDeletePost, findPostWithName }