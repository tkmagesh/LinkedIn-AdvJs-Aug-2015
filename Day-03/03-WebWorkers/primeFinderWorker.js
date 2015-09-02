function isPrime(n){
    if (n <=3 ) return true;
    for(var i=2; i <= (n/2); i++)
        if (n % i === 0) return false;
    return true;
}

function findPrimes(start, end){
    var result = 0;
    var onePercent = (end - start)/100;
    for(var i=start; i<=end; i++){
        if (isPrime(i)) ++result;
        var completed = i - start;
        if (completed % onePercent === 0){
            var percentCompleted = ((i - start)/(end - start)) * 100;
            var msg = {
                type : 'progress',
                percentCompleted : percentCompleted
            };
            self.postMessage(msg);
        }

    }
    return result;
}
console.log("worker is loaded");

self.addEventListener("message", onMessage);
function onMessage(evtArg){
    var request = evtArg.data;
    var primeCount = findPrimes(request.start, request.end);
    self.postMessage({
        type : 'completed',
        primeCount : primeCount
    });
}
