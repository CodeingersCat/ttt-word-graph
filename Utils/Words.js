export const breakWords = (data) => {
    let lineArray = []; 
    let wordArray = []; 

    /*Splitting all the lines and then 
    extracting all whitespace separated character groups*/
    data.split("\n").forEach(line => lineArray.push(...line.split(" ")));

    //Removing symbols and special characters at the ends
    lineArray.forEach(word => {
        word = word.toLowerCase();
        let left = 0;
        let right = word.length-1;

        let lsymbol = word.charCodeAt(left) < 96 || word.charCodeAt(left) > 123;
        let rsymbol = word.charCodeAt(right) < 96 || word.charCodeAt(right) > 123;

        while(lsymbol){
            left++;
            lsymbol = word.charCodeAt(left) < 96 || word.charCodeAt(left) > 123;
        }

        while(rsymbol){
            right--;
            rsymbol = word.charCodeAt(right) < 96 || word.charCodeAt(right) > 123;
        }
        
        if(left < right) word = word.substring(left, right+1);
        else word = word.substring(left);
        
        //We skip character groups having special characters mid-phrase
        let flag = false;
        while(left < right){
            if(lsymbol){ 
                flag = true;
                break;
            }
            left++;
            lsymbol = word.charCodeAt(left) < 96 || word.charCodeAt(left) > 123;
        }

        if(!flag){
            wordArray.push(word);
        }
        
    })

    //Filtering for valid words
    wordArray = wordArray.filter(word => word.length > 1)

    //Dictionary 
    let dict = {}
    wordArray.forEach(word => {  
        dict[word.toLowerCase()] = dict[word.toLowerCase()] >=1 ? dict[word.toLowerCase()]+1 : 1
    });

    //Getting the sorted list of words
    let top20 = Object.keys(dict).sort((a,b) => dict[b]-dict[a]).slice(0,20);

    top20 = top20.map(word => {
        const data = {
            "Word": word,
            "Count": dict[word]  
        }

        return data;
    })
    
    return top20;
}
