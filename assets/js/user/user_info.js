$(function() {//* jQuery入口函数
    //todo 表单验证规则
  var form = layui.form
  var layer = layui.layer

  form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()

  //todo 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // console.log(res)
        // * 调用 form.val() 快速为表单赋值；表单需设置lay-filter="formUserInfo"属性
        form.val('formUserInfo', res.data)
      }
    })
  }

  //todo 重置表单的数据
  $('#btnReset').on('click', function(e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })

  //todo 监听表单的提交事件
  $('.layui-form').on('submit', function(e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),//* 快速获取表单数据
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()//* 当前页面为window，位于fm中，fm的父页面为index.html，父页面有个更新用户头像信息的方法getUserInfo()
      }
    })
  })
})
