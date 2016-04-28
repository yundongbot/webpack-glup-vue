/** 获取title文字
 *  @param {string} tab Tab分类
 */
exports.getTitleStr = tab => {
  let str = ''

  switch (tab) {
    case 'share':
      str = '分享'
      break
    case 'ask':
      str = '问答'
      break
    default:
      str = '全部'
      break
  }

  return str
}
