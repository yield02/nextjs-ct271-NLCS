import axios from "axios";


export function convertState(status) {
    switch (status) {
        case 'allow':
            return 'Được duyệt'
        case 'waiting':
            return 'Chờ duyệt'
        case 'banned':
            return 'Cấm'
        default:
            return 'error';
    }
}

export function RestorePost(_id, user_id, categoryID, setData) {

    const data = {
        restore: true,
        user_id,
        _id,
        categoryID,
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/post/update',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
      
      axios.request(config)
      .then((response) => {
          if(response.status == 200) {
            setData(prev => {
                const updateData  = prev.map(item => {
                    if(item._id === data?._id) {
                        item.deleteAt = false;
                    }
                    return item;
                })
                return updateData
            })
            alert("Thành công");
          }
      })
      .catch((error) => {
        console.log(error);
      });
}

export function DeleteManyPost(data, setData) {
    
    console.log(data);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/post/deleteManyPost',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
      
      axios.request(config)
      .then((response) => {
          if(response.status == 200) {
            setData(prev => {
                const updateData  = prev.filter(item => {
                    return !data.postsId.includes(item._id);
                })
                return updateData;
            })
            alert("Thành công");
          }
      })
      .catch((error) => {
        console.log(error);
      });
}