# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br>

# About the project

<img src="https://rawcdn.githack.com/CodeingersCat/ttt-word-graph/5e6b2b609f4f7eadb7ef06e049498b3068fc0276/screenshots/index.jpg" alt="index" width="800"/>
<img src="https://rawcdn.githack.com/CodeingersCat/ttt-word-graph/5e6b2b609f4f7eadb7ef06e049498b3068fc0276/screenshots/graph.jpg" alt="graph" width="800"/>

<br>

### A web application to fetch text content at [https://www.terriblytinytales.com/test.txt](https://www.terriblytinytales.com/test.txt) and show a histogram of the 20 most occurring words.

<br>

## Framework/Libraries used:
<ul>
    <li><a href="https://nextjs.org/">NextJs - Web framework</a></li>
    <li><a href="https://recharts.org/">Rechart - Charts components library</a></li>
    <li><a href="https://www.axios.com/">Axios - Used to make http requests</a></li>
</ul>

<br>

## Logic explanation
<br>
The module <code> Utils/Words.js </code> contains the logic which takes text and returns the frequency of the 20 most occurring words in the text. 
<br>
The split() function is used to first obtain all lines and then get all character sequences separated by whitespaces from each line.
<br>
<br>

```js
data.split("\n").forEach(line => lineArray.push(...line.split(" ")));
```
 Each string in <code> lineArray </code> is converted to lowercase and special characters are removed from the ends. 
<br>

```js
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
```

Then the string is checked for special characters from beginning till end and if it doesn't have any, we consider it to be a word and add it to our list.
<br>

```js
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
```

After we have our list of words, we use a dictionary to keep count of each word. After we have our dictionary, we sort it to obtain the frequency of words in descending order and from the result, we take the top 20 words.
<br>

```js
let dict = {}
wordArray.forEach(word => {  
    dict[word.toLowerCase()] = dict[word.toLowerCase()] >=1 ? dict[word.toLowerCase()]+1 : 1
});

let top20 = Object.keys(dict).sort((a,b) => dict[b]-dict[a]).slice(0,20);
```

We then construct the array of data objects for the bar-chart component provided by the Rechart library.
<br>

```js
top20 = top20.map(word => {
    const data = {
        "Word": word,
        "Count": dict[word]  
    }

    return data;
})
    
return top20;
```
