function isUnique(str){
    if(str.length>128) return false;
    let characters = new Set()
        for(let char of str){
            characters.add(char)
        }
    return characters.size === str.length ? true : false; 
}

function checkPermutation(s1, s2){
    /*if(s1.length !== s2.length) return false 
    let freqCounter1 = {}
    let freqCounter2 = {}

    for(let char of s1){
        freqCounter1[char] = (freqCounter1[char]||0)+1
    }

    for(let char of s2){
        freqCounter2[char] = (freqCounter2[char]||0)+1
    }


    for(let key in freqCounter1){
        if(!(key in freqCounter2)) return false;
        if(freqCounter1[key] !== freqCounter2[key]) return false; 
    }
    return true;*/
    //easier 
    if(s1.length !== s2.length) return false 
    s1.sort()
    s2.sort()
    
    for(let i=0; i<s1.length; i++){
        if(s1[i]!==s2[i]){
            return false
        }
    }
    return true;
}

/*function URLify(s){
    let len = s.length
    console.log(len)
    return s.split(" ").join("%20").slice(0,len)
    
}*/ 

function URLify(str, trueLength){
    let strArr = str.split('')
    const numberOfSpaces = countOfChar(strArr, 0, trueLength, ' ');
    let newIndex = trueLength - 1 + numberOfSpaces * 2;

    for(let oldIndex = trueLength-1; oldIndex >=0; oldIndex--){
        if(str[oldIndex] === ' '){
            strArr[newIndex] = "0";
            strArr[newIndex - 1] = "2";
            strArr[newIndex - 2] = "%";
            newIndex -= 3;
        }else{
            strArr[newIndex] = strArr[oldIndex]
            newIndex -= 1;
        }
    }
    
    
    return strArr.join('');
}

function countOfChar(str, start, end, target){
    let count = 0; 
    for(let i = start; i < end; i++){
        if(str[i]===target){
            count++;
        }
    }
    return count;
    
}

function palindromePermutation(str){
    let freqObj = {}
    let charLength = 0
    
    for(let char of str.toLowerCase()){
        if(/[a-z]/.test(char)){
            freqObj[char] = (freqObj[char]||0)+1
            charLength++;
        }
    }
    console.log(charLength)

    if(charLength % 2 === 1){
        let count = 0; 
        for(let key in freqObj){
            if(freqObj[key] % 2 !== 0){
                count ++
            }
        }
        if(count>=2) return false;
        
    }else{
        for(let key in freqObj){
            if(freqObj[key] % 2 !== 0){
                return false
            }
        }
    }

    return true;
    
}

function oneAway(str1, str2){
    let delta = Math.abs(str1.length - str2.length)

    if(delta>=2){
        return false;
    }else if(delta === 0){
        return checkReplaceChar(str1, str2)
    }else{
        //send smaller first
        if(str1.length < str2.length){
            return checkInsertChar(str1, str2)
            
        }else{
            return checkInsertChar(str2, str1)
        }
    } 
    
}
function checkReplaceChar(str1, str2){
    let foundDifference = false; 
    for(let i=0; i<str1.length; i++){
        if(str1.charAt(i) !== str2.charAt(i)){
            if(foundDifference){
                return false;
            }
            foundDifference = true;
        }
    }
    return true; 
}

function checkInsertChar(str1, str2){
    let index1 = 0; 
    let index2 = 0; 

    while(index1<str1.length && index2<str2.length){
        if(str1.charAt(index1) !== str2.charAt(index2)){
            if(index1 !== index2){
                return false
            }
            index2++
        }else{
            index1++; 
            index2++; 
        }
    }
}

function stringCompression(str){
    
    let compressed = [];
    let countConsecutive = 0; 

    
    for(let i =0; i<str.length; i++){
        countConsecutive++

        
        if(str[i+1] !== str[i] || i + 1 >= str.length){
            
            compressed.push(str[i], countConsecutive)
            countConsecutive = 0; 
            
        }
    }

    return compressed.length < str.length ? compressed.join("") : str
    
}


function rotateMatrix(matrix){
    if( matrix.length === 0 || matrix.length !== matrix[0].length) return false;

    const n = matrix.length

     for(let layer = 0; layer < n/2; layer++){
         let first = layer;
         let last = n - 1 -layer;
         for(let i = first; i<last;i++){
             let offset = i - first;
                
             let temp  = matrix[first][i]
             console.log("Top:" + temp)
             matrix[first][i] = matrix[last - offset][first]
             matrix[last - offset][first] = matrix[last][last - offset]
             matrix[last][last - offset] = matrix[i][last]
             matrix[i][last] = temp;
         }
     }  

    return matrix 
}

