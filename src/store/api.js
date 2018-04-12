export default {
  // AgreeController
  'addAgree': ['/agree/addAgree', 'POST'],
  'addDisAgree': ['/agree/addDisAgree', 'POST'],
  // ArticleController
  'getArticle': ['/article/getArticle', 'POST'],
  'getArticles': ['/article/getArticles', 'POST'],
  'getArticlesByLabelId': ['/article/getArticles', 'GET'],
  'searchNews': ['/article/searchNews', 'POST'],
  // CommentController
  'addComment': ['/comment/addComment', 'POST'],
  'findComment': ['/comment/findCommentByArticeId', 'POST'],
  // LabelController
  'getLabels': ['/getLabels', 'POST'],
  // UserController
  'userAddLabel': ['/userRegisterAddLabel', 'POST'],
  'addCollect': ['/userCollect', 'POST'],
  'cancelCollect': ['/cancelCollect', 'POST'],
  'getCollectList': ['/getAllCollect', 'POST'],
  'login': ['/userLoginByTelephone', 'POST'],
  'userFocusOn': ['/userFocusOn', 'POST'],
  'updateUserinfo': ['/userUpdate', 'POST'],
  'dislike': ['/looked', 'POST'],
  // VerificationCodeController
  'getCode': ['/getVCodeForRegister', 'POST']
}
