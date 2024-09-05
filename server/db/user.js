import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
  },
  image:{
    type:String,
    set: (v) =>
      v === "" || v=== undefined  ? "https://imgs.search.brave.com/TPIEZzbY2bLFiuu9xwnM_EsR_f44cJtHWilFIjBsov0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jNC53/YWxscGFwZXJmbGFy/ZS5jb20vd2FsbHBh/cGVyLzk2OC81Mjkv/Mjg1L2l6enktbHVz/aC1tb2RlbC13b21l/bi1wb3Juc3Rhci13/YWxscGFwZXItcHJl/dmlldy5qcGc":v,        
},
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userschema);
export default User;