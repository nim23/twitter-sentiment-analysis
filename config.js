module.exports = {
  twitter: {
    consumer_key: 'M63c8Bkm8TlsLinYiYEMtbVxC',
    consumer_secret: 'w4MTb0RAG20cfxtL5T8XFli1AmxNjleGg9xOW6ulZcYaJyohWz',
    access_token_key: '43528426-HnttjpHFz3zgER0cEMyggX6yghXaXs9WzhIgbqImK',
    access_token_secret: 'sV9qhh3GFKGRL4QW52tofXoO5k4z4g5Mf0wVDfM2zCs3l'
  },
  tweetSentiment:{
    endpoint: 'https://www.tweetsentimentapi.com/api/?',
    key: '7cf3c8949261a9dd65b46702b26cae4fa2a547b4',
    getEndpointWithKey: function(){
      return this.endpoint + 'key=' + this.key;
    }
  }
};
