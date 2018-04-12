<template>
  <div v-loading="loading" id="article">
    <x-header class="x-header" style="position: fixed; width: 100vw; top: 0; z-index: 5000;" @on-click-back="$router.push('/')">
      <div v-if="!loading" class="header-left" slot="right">
        <span @click="doAgree"><icon :name="upvoteIcon" :h="20" :w="20" />{{ article.agreeNum ? article.agreeNum : ' ' }}</span>
        <span @click="doDisAgree"><icon :name="disAgreeIcon" :h="20" :w="20" />{{ article.disagressNum ? article.disagressNum : ' ' }}</span>
      </div>
    </x-header>
    <div v-if="!loading">
      <div class="article-container">
        <div>
          <div class="article-header">
            <h3>{{ article.title }}</h3>
            <div class="article-info">
              <span>{{ article.author }} · {{ article.time | dateStr }}</span>
            </div>
          </div>
          <div class="article-content">
            <p>{{ article.content }}</p>
          </div>
          <div class="article-footer">
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <popup position="right" v-model="commentShow" style="width: 100vw; height: 100vh">
          <div class="comment-body">
            <div class="comment-header">
              <icon @click.native="commentShow=false" class="close" name="close" :h="15" :w="15" />
              <div>评论</div>
            </div>
            <div class="comment-content">
              <div v-for="item of comment" :key="comment.id" class="comment-item">
                <div class="comment-name">{{ item.pLname }}</div>
                <div class="comment-msg">{{ item.content }}</div>
                <div class="comment-time">{{ item.time | commentDateStr }}</div>
              </div>
            </div>
            <divider style="width: 80%; margin-left: 10%;">已显示全部内容</divider>
            <div @click="commentTxtShow=true" class="comment-footer">
                <icon slot="label" name="pen" :h="20" :w="30" />
                点击此处说两句...
            </div>
          </div>
          <div v-if="commentTxtShow" class="comment-textarea">
            <div class="comment-textarea-mask" @click="commentTxtShow=false"></div>
            <div class="comment-textarea-content">
              <group>
                <x-textarea ref="commendTextarea" v-model="commendText" placeholder="留下你的评论">
                </x-textarea>
              </group>
              <div class="comment-textarea-bottom">
                <el-button class="comment-button" @click.native="submitComment">发表</el-button>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div class="article-bottom-bar">
        <div class="article-bottom-comment" @click="commentTxtShow1=true">
            <icon slot="label" name="pen" :h="20" :w="30" />
            点击此处说两句...
        </div>
        <div class="icon-groups">
          <span @click="showComment"><icon name="comment-filling" :h="20" :w="20" /> {{ article.plNum ? article.plNum : '' }}</span>
          <span @click="doCollect"><icon :name="collectIcon" :h="20" :w="20" /></span>
        </div>
      </div>
      <div v-if="commentTxtShow1" class="comment-textarea">
        <div class="comment-textarea-mask" @click="commentTxtShow1=false"></div>
        <div class="comment-textarea-content">
          <group>
            <x-textarea ref="commendTextarea1" v-model="commendText" placeholder="留下你的评论">
            </x-textarea>
          </group>
          <div class="comment-textarea-bottom">
            <el-button class="comment-button" @click.native="submitComment">发表</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { TransferDom, XHeader, Popup, Group, XTextarea, CellBox, Divider } from 'vux'
import { mapGetters, mapActions } from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XHeader,
    Group,
    XTextarea,
    CellBox,
    Divider
  },
  data () {
    return {
      isActive: false,
      activeTime: 0,
      activeTimer: null,
      activeInterval: 10,
      lasterActiveTime: 0,
      extraInfo: {},
      upvoteIcon: 'good-white',
      disAgreeIcon: 'bad-white',
      collectIcon: 'favorite',
      preArticleId: '',
      commentShow: false,
      commentPid: 0,
      commentBid: 0,
      commendText: '',
      commentTxtShow: false,
      commentTxtShow1: false
    }
  },
  mounted () {
    this.initView()
  },
  computed: {
    ...mapGetters([
      'article',
      'comment',
      'loading',
      'userinfo'
    ])
  },
  destroyed () {
    // alert('用户有效活动时间：' + this.activeTime + 's')
  },
  watch: {
    commentTxtShow () {
      this.$nextTick(_ => {
        if (typeof this.$refs.commendTextarea !== 'undefined') {
          this.$refs.commendTextarea.focus()
        }
      })
    },
    commentTxtShow1 () {
      this.$nextTick(_ => {
        if (typeof this.$refs.commendTextarea1 !== 'undefined') {
          this.$refs.commendTextarea1.focus()
        }
      })
    }
  },
  methods: {
    ...mapActions([
      'getArticle',
      'findComment',
      'addComment',
      'addCollect',
      'cancelCollect',
      'addAgree',
      'addDisAgree',
      'updateLoading'
    ]),
    initView () {
      let articleId = this.$route.params.id
      this.updateLoading(true)
      if (this.preArticleId !== this.article.id) {
        // this.extraInfo = {}
        this.getArticle({ articleId, userId: this.userinfo ? this.userinfo.id : null }).then(res => {
          this.findComment({ articleId }).then(res => {
            this.upvoteIcon = this.article.flagAgree ? 'good-white-filling' : 'good-white'
            this.disAgreeIcon = this.article.flagDisagree ? 'bad-white-filling' : 'bad-white'
            this.collectIcon = this.article.flagCollect ? 'favorite-filling' : 'favorite'
            this.updateLoading(false)
          })
        })
        // .then(res => {
        //   this.preArticleId = this.article.id
        //   // 获取文章的评论数和点赞数
        //   this.getExtraInfo().then(res => {
        //     this.extraInfo = res.data
        //     this.addActiveListener()
        //     this.updateLoading(false)
        //   })
        // })
        window.scrollTo(0, 0)
      }
    },
    addActiveListener () {
      this.startCountActiveTime()
      document.ontouchstart = () => {
        this.activeTime++
        this.startCountActiveTime()
      }
      window.onfocus = () => { this.startCountActiveTime() }
      window.onblur = () => {
        clearInterval(this.activeTimer)
        this.isActive = false
      }
    },
    startCountActiveTime () {
      clearInterval(this.activeTimer)
      this.lasterActiveTime = this.activeTime
      this.activeTimer = setInterval(() => {
        if (this.activeTime - this.lasterActiveTime + 1 < this.activeInterval && this.isActive) {
          this.activeTime++
        } else {
          clearInterval(this.activeTimer)
        }
      }, 1000)
      this.isActive = true
    },
    showComment () {
      this.commentShow = true
      // this.$router.push('/article/comment')
      // this.$store.commit('setArticleId', this.articleId)
    },
    submitComment () {
      if (!this.userinfo) {
        this.$vux.toast.text('请先登录', 'bottom')
      } else if (!this.commendText) {
        this.$vux.toast.text('请输入评论内容', 'bottom')
      } else {
        this.commentTxtShow = false
        this.commentTxtShow1 = false
        this.addComment({
          content: this.commendText,
          articleId: this.article.id,
          userId: this.userinfo.id,
          pid: this.commentPid,
          bid: this.commentBid
        })
        this.commendText = ''
      }
    },
    doCollect () {
      if (!this.userinfo) {
        this.$vux.toast.text('请先登录', 'bottom')
      } else {
        this.collectIcon = this.collectIcon === 'favorite-filling' ? 'favorite' : 'favorite-filling'
        if (!this.article.flagCollect) {
          this.addCollect({
            userId: this.userinfo.id,
            articleId: this.article.id
          }).then(res => {
            if (res.data.code === 0) {
              this.collectIcon = 'favorite-filling'
            } else {
              this.collectIcon = 'favorite-filling'
              this.$vux.toast.text('连接服务器超时', 'bottom')
            }
          })
        } else {
          this.cancelCollect({
            userId: this.userinfo.id,
            articleId: this.article.id
          }).then(res => {
            if (res.data.code === 0) {
              this.collectIcon = 'favorite'
            } else {
              this.collectIcon = 'favorite-filling'
              this.$vux.toast.text('连接服务器超时', 'bottom')
            }
          })
        }
      }
    },
    doAgree () {
      if (!this.userinfo) {
        this.$vux.toast.text('请先登录', 'bottom')
      } else {
        this.upvoteIcon = this.upvoteIcon === 'good-white-filling' ? 'good-white' : 'good-white-filling'
        this.addAgree({
          userId: this.userinfo.id,
          articleId: this.article.id
        }).then(res => {
          if (res.data.code === 0 && this.article.flagAgree) {
            this.upvoteIcon = 'good-white-filling'
          } else if (res.data.code === 0) {
            this.upvoteIcon = 'good-white'
          } else {
            this.upvoteIcon = this.article.flagAgree === 0 ? 'good-white' : 'good-white-filling'
            this.$vux.toast.text('连接服务器超时', 'bottom')
          }
        })
      }
    },
    doDisAgree () {
      if (!this.userinfo) {
        this.$vux.toast.text('请先登录', 'bottom')
      } else {
        this.disAgreeIcon = this.disAgreeIcon === 'bad-white-filling' ? 'bad-white' : 'bad-white-filling'
        this.addDisAgree({
          userId: this.userinfo.id,
          articleId: this.article.id
        }).then(res => {
          if (res.data.code === 0 && this.article.flagDisagree) {
            this.disAgreeIcon = 'bad-white-filling'
          } else if (res.data.code === 0) {
            this.disAgreeIcon = 'bad-white'
          } else {
            this.disAgreeIcon = this.article.flagDisagree === 0 ? 'bad-white' : 'bad-white-filling'
            this.$vux.toast.text('连接服务器超时', 'bottom')
          }
        })
      }
    }
  },
  filters: {
    dateStr (dateTimeStamp) {
      // let minute = 1000 * 60
      // let hour = minute * 60
      // let day = hour * 24
      // let week = day * 7
      // let halfamonth = day * 15
      // let month = day * 30
      let now = new Date().getTime()
      let diffValue = now - dateTimeStamp
      if (diffValue < 0) {
        return
      }
      // let minC = parseInt(String(diffValue / minute))
      // let hourC = parseInt(String(diffValue / hour))
      // let dayC = parseInt(String(diffValue / day))
      // let weekC = parseInt(String(diffValue / week))
      // let monthC = parseInt(String(diffValue / month))
      // let result
      // if (monthC >= 1 && monthC <= 3) {
      //   result = ' ' + monthC + '月前'
      // } else if (weekC >= 1 && weekC <= 3) {
      //   result = ' ' + weekC + '周前'
      // } else if (dayC >= 1 && dayC <= 6) {
      //   result = ' ' + dayC + '天前'
      // } else if (hourC >= 1 && hourC <= 23) {
      //   result = ' ' + hourC + '小时前'
      // } else if (minC >= 1 && minC <= 59) {
      //   result = ' ' + minC + '分钟前'
      // } else if (diffValue >= 0 && diffValue <= minute) {
      //   result = '刚刚'
      // } else {
      let datetime = new Date()
      datetime.setTime(dateTimeStamp)
      let Nyear = datetime.getFullYear()
      let Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      let Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      let Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
      let Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
      // let Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
      return Nyear + '-' + Nmonth + '-' + Ndate + ' ' + Nhour + ':' + Nminute
      // }
      // return result
    },
    commentDateStr (dateTimeStamp) {
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let week = day * 7
      let month = day * 30
      let now = new Date().getTime()
      let diffValue = now - dateTimeStamp
      if (diffValue < 60 * 1000) {
        return '刚刚'
      }
      let minC = parseInt(String(diffValue / minute))
      let hourC = parseInt(String(diffValue / hour))
      let dayC = parseInt(String(diffValue / day))
      let weekC = parseInt(String(diffValue / week))
      let monthC = parseInt(String(diffValue / month))
      let result
      if (monthC >= 1 && monthC <= 3) {
        result = ' ' + monthC + '月前'
      } else if (weekC >= 1 && weekC <= 3) {
        result = ' ' + weekC + '周前'
      } else if (dayC >= 1 && dayC <= 6) {
        result = ' ' + dayC + '天前'
      } else if (hourC >= 1 && hourC <= 23) {
        result = ' ' + hourC + '小时前'
      } else if (minC >= 1 && minC <= 59) {
        result = ' ' + minC + '分钟前'
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = '刚刚'
      } else {
        let datetime = new Date()
        datetime.setTime(dateTimeStamp)
        let Nyear = datetime.getFullYear()
        let Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
        let Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
        let Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
        let Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
        return Nyear + '-' + Nmonth + '-' + Ndate + ' ' + Nhour + ':' + Nminute
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>

#article {
  height: 100vh;
  .x-header {
    h1 {
      margin: 0 !important;
    }
  }
  .header-left {
    color: #FFF;
    span {
      padding-left: 15px;
      display: inline-block;
      svg {
        padding-right: 5px;
      }
    }
  }
  .article-container {
    padding: 46px 0;
    .article-header {
      padding: 10px 15px;
      position: relative;
      h3 {
        margin-bottom: 10px;
      }
      .article-info {
        font-size: 10px;
        color: #888;
      }
      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: ' ';
        display: block;
        height: 1px;
        width: 100vw;
        background-color: #F1F1F1;
      }
    }
    .article-content {
      padding: 10px 15px;
      margin-top: 10px;
    }
    .article-footer {
      padding: 10px 15px;
      span {
        float: right;
      }
    }
  }
  .article-bottom-bar {
    border-top: 1px solid #F1F1F1;
    padding: 10px 15px;
    position: fixed;
    bottom: 0;
    width: 100vw;
    box-sizing: border-box;
    background-color: #FFF;
    .article-bottom-comment {
      display: inline-block;
      width: 70%;
      font-size: 14px;
      color: #888;
    }
    .icon-groups {
      display: inline-block;
      width: 25%;
      span {
        display: inline-block;
        width: 45%;
        font-size: 14px;
        color: #8A8A8A;
        &:last-child {
          text-align: right
        }
      }
    }
  }
}
.comment-body {
  overflow: hidden;
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #FEFEFE;
  padding: 45px 0 53px 0; 
  box-sizing: border-box;
  .comment-header {
    position: fixed;
    top: 0;
    width: 100vw;
    box-sizing: border-box;
    height: 45px;
    background-color: #FFF;
    .close {
      z-index: 1;
      padding: 15px;
      position: absolute;
    }
    div {
      box-sizing: border-box;
      padding: 10px 5px;
      position: absolute;
      width: 100vw;
      left: 0;
      text-align: center;
    }
  }
  .comment-content {
    padding: 10px 15px;
    .comment-item {
      margin-top: 5px;
      .comment-name {
        color: #888;
      }
      .comment-msg {
        padding: 10px 0;
      }
      .comment-time {
        color: #999;
        font-size: 12px;
      }
      &:not(:last-child)::after {
        margin-top: 10px;
        content: ' ';
        display: block;
        height: 1px;
        width: 100vw;
        background-color: #F1F1F1;
      }
    }
  }
  .comment-footer {
    color: #8A8A8A;
    font-size: 14px;
    padding: 15px;
    background-color: #FEFEFE;
    border-top: 1px solid #F1F1F1;
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100vw;
    box-sizing: border-box;
  }
  
}

.comment-textarea {
    z-index: 5000;
    background-color: #FFF;
    width: 100vw;
    position: fixed;
    bottom: 30px;
    .comment-textarea-mask {
      background-color: rgba(0,0,0,.3);
      height: 100vh;
      width: 100vw;
      top: 0;
      position: fixed;
    }
    .comment-textarea-content {
      .comment-textarea-bottom {
        position: fixed;
        width: 100vw;
        background-color: #FFF;
        height: 35px;
        bottom: 0;
        .comment-button {
          margin-right: 15px;
          height: 28px;
          font-size: 12px;
          position: absolute;
          right: 0;
          width: 6em;
          border-radius: 16px;
          color: #FFF;
          background-color: #D73C50;
          border: 0;
          padding: 0;
          display: -webkit-inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
