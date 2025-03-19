function isValid(str) {
    const stack = [];
    const matchBrackets = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
  
    for (let i = 0; i < str.length; i++) {
        const current = str[i];
        if (matchBrackets[current]) {
            stack.push(current);
        } else {
            let lastClose = stack.pop();
            if (current !== matchBrackets[lastClose]) return false;
        }
    }
  
    return stack.length === 0;
  }
  
  let bracketsString = "";
  
  for (let i = 0; i < 10_000; i++) {
    if (i < 5000) {
        bracketsString += '{'
    } else {
        bracketsString += '}'
    }
  }
  
  
  console.log("()\t:", isValid("()"));
  console.log("()[]{}\t:", isValid("()[]{}"));
  console.log("{[]}\t:", isValid("{[]}"));
  console.log("valid 10^4 string:", isValid(bracketsString));
  console.log("(]\t:", isValid("(]"));
  console.log("([)]\t:", isValid("([)]"));