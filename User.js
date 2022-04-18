const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    u_id: { //유저 아이디
        type: String,
        maxlength: 30,
        unique: 1
      },
      u_password: {
        //비밀번호 암호화 bycrpt
        type: String,
        maxlength: 20,
        unique: 1
      },
      u_email: {
        type: String,
        maxlength: 50,
        unique: 1
      },
      u_phonenum: {
        type: String,
        maxlength: 13,
        unique: 1
      },
    //   u_image: { //프로필 이미지 아직 X
    //     data: Buffer,
    //     contentType: String
    //   },
      u_description: { //프로필 소개
        type: String
      },
      u_keyword: {
        type: [String],
        default: undefined
      },
      u_blist: { //배지 리스트
        type: [String],
        default: undefined
      },
      u_bnum: { //배지 개수
        type: [Number],
        default: 0
      }

},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema);