export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  export const generateUniqueId = (length = 22) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      var index = Math.floor(Math.random() * chars.length);
      result += chars.charAt(index);
    }
    return result;
  }

  export const capitalize = (sentence) => {
  let words = sentence.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

export const validateUserName = (user) => {
	let pat = /^[a-zA-Z /-]{3,25}$/
	let  msg = [];
	  if(user){
		 msg = {status: 'success'}
          if(parseInt(user.length) > 3){
              if(pat.test(user)){
                msg = {status: 'success', details : 'none'}
            }else{
              msg = {status: 'failed', details :"Name should not include Special Characters"}
            }
        }else{
          msg = {status: 'failed', details :"Username Must Be More than 3 characters"}      
        }
	  }else{
		msg = {status: 'failed', details :"Username is required"}
	  } 
	 return msg;
  }

  
export const validateEmail = (email) => {
	// let regex =  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	let regex = new RegExp(/^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)
	
	let msg= [];
	if(!email){
	  msg= {status : 'failed', details : "Email Provided is Required!!"};
	}else if (!regex.test(email)) {
		msg= {status : 'failed', details : "Email Provided is Invalid!!"};
	  }else{
	  msg= {status : 'success'};
	}
	return msg;
  }

  export const ValidatePassword = (pass) => {
    let regex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$_%^&*])[a-zA-Z0-9!@#$_%^&*]{6,99}$/)
    
    let msg= [];
    if(!pass){
      msg= {status : 'failed',details :"Password Is Required"};
    }else if(parseInt(pass.length) < 6){
      msg= {status : 'failed',details :"Password should be more than 6 characters"};
    }else if(!regex.test(pass)) {
      msg= {status : 'failed', details :"Include Alphabets, Numbers and Special Characters!"};
      }else{
      msg= {status : 'success'};
    }
    return msg;
    }

  export const PasswordMatch = (pass, confPass) => {
	
    let msg= [];
    if(!confPass || confPass == ''){
      msg= {status : 'failed',details :"Password Confirmation Is Required"};
    }else if (pass != confPass) {
      msg= {status : 'failed', details :"Passwords provided do not match!!!"};
      }else{
      msg= {status : 'success'};
    }
    return msg;
    }


    export const distinctIdsWithHighestScore = 
    (arr)  =>{
      const idMap = new Map();
      
      // loop over the array of objects
      arr.forEach(obj => {
        const { id, score } = obj;
        
        // if the id is not yet in the map or the score is higher than the current value
        if (!idMap.has(id) || score > idMap.get(id).score) {
          // update the map with the new score and object
          idMap.set(id, { score, obj });
        }
      });
      
      // sort the map by score in descending order and return the objects
      return [...idMap.values()].sort((a, b) => b.score - a.score).map(({ obj }) => obj);
    }
    
    export const checkAndAward = (score,qtnNum) => {
      let percentage = (score / qtnNum) * 100;
      
      switch(true){
        case percentage > 89:
          return 5;
          break;
        case percentage > 69:
           return 4;
          break;
        case percentage > 59:
           return 3;
          break;
        case percentage > 49:
           return 2;
          break;
        default :
           return 1;
        break;
      }
    }
    
    export const generateInitials = (name) => {
      let initials = "";
      const words = name.split(" ");
      for (let i = 0; i < 2; i++) {
        initials += words[i].charAt(0);
      }
      return initials;
    }
    
    export const truncateSentence = (sentence, len) => {
  if (sentence.length > len) {
    return sentence.slice(0, len) + "...";
  } else {
    return sentence;
  }
}

export const timeAgo = (serverTimestamp) => {
  const now = new Date();
  const timestamp = serverTimestamp.toDate();
  const diff = now.getTime() - timestamp.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}
    
  export const replaceCharacters = (stmt) => {
    stmt= stmt.replace(/&quot;/g, "\"");
    stmt= stmt.replace(/&ldquo;/g, "\"");
    stmt= stmt.replace(/&#039;/g, "\'");
    stmt= stmt.replace(/&lrm;/g, " ");
    stmt= stmt.replace(/&rlm;/g, " ");
    stmt= stmt.replace(/&shy;/g, " ");
    stmt= stmt.replace(/&rsquo;/g, "\'");
    stmt= stmt.replace(/&lsquo;/g, "\'");
    stmt= stmt.replace(/&apos;/g, "\'");
    stmt= stmt.replace(/&Ouml;/g, "Ö");
    stmt= stmt.replace(/&auml;/g, "Ö");
    stmt= stmt.replace(/&Oacute;/g, "Ó");
    stmt= stmt.replace(/&Otilde;/g, "Ó");
    stmt= stmt.replace(/&ograve;/g, "Ó");
    stmt= stmt.replace(/&Ocirc;/g, "Ô");
    return stmt;
  }