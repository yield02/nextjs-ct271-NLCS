import axios from "axios";



export function BannedAccount(_id, reason, setData) {

    const data = {
        _id, 
        status: {status: "banned", reason}
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/user/manager/updateUser',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
      
      axios.request(config)
      .then((response) => {
        
        if(response.status == 200) {
            setData(prev => {
                const updateData = prev.map(item => {
                    if(item?._id == _id) {
                        item.status = {status: "Banned", reason}
                    }
                    return item;
                }) 
                return updateData;
            })
            return true;
            alert("Thành công");
        }
          
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

}


export function UnBannedAccount(_id, setData) {

  const data = {
      _id, 
      status: {status: "allow"}
  }

  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/user/manager/updateUser',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };
    
    axios.request(config)
    .then((response) => {
      
      if(response.status == 200) {
          setData(prev => {
              const updateData = prev.map(item => {
                  if(item?._id == _id) {
                      item.status = {status: "allow"}
                  }
                  return item;
              }) 
              return updateData;
          })
          return true;
      }
        
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

}

export function DeleteAccount(_id, setData) {

  const data = {
      _id
  }

  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/user/manager/deleteUser',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };
    
    axios.request(config)
    .then((response) => {
      
      if(response.status == 200) {
          setData(prev => {
              const updateData = prev.filter(item => {
                  return item._id != _id;
              }) 
              return updateData;
          })
          return true;
      }
        
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

}

