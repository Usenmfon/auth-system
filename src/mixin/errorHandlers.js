exports.parseDBError = (e) => {
    const index = e.message.indexOf(':')
    let message = e.message
    if (index >= 0) {
      message = e.message.substr(index + 1)
    }
    return message
  }
  
  exports.parseValidationError = (error,count)=>{
    
    if(!count || !error){
      return "Invalid Error"
    }
  
    let data = {}
    Object.keys(error.errors).forEach((value)=>{
      if(error.has(value)){
        data[value] = error.first(value)
      }
    })
  
    return data
  }