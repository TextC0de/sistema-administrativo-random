import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

type Role = 'Tecnico' | 'Administrativo Tecnico' | 'Administrativo Contable' | 'Auditor'


/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  fullName:{
    type:String
  },
  role:[{
    type:String,
  }]
}, {timestamps:true})

UserSchema.pre('save', function(next){
    
    if(this.isModified('firstName') || this.isModified('lastName')){
      this.fullName = `${this.firstName} ${this.lastName}`
    }
    if(this.isModified("password")) {
      this.password = bcryptjs.hashSync(this.password, 10);
    }
    next()
})

UserSchema.methods.comparePassword = function(plaintext:string) {
    return bcryptjs.compareSync(plaintext, this.password)
};

export default mongoose.models.User ||  mongoose.model('User', UserSchema)
