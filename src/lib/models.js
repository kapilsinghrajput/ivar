import mongoose, { Schema } from "mongoose";
// import { unique } from "next/dist/build/utils";

const AdminUsers = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: Number,
      require: true,
      // 0 = superadmin , 1 = Admin  , 2 =  subadmin ,
    },

    rolestatus: {
      type: Number,
      default: 1, // 1 = active , 0 = not active
    },
    rolename: {
      type: String,
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "AdminRoleModel",
      // required: false,
    },
  },
  { timestamps: true }
);

const AdminRole = new mongoose.Schema(
  {
    rolename: {
      type: String,
      required: true,
      unique: false,
    },
    roles: {
      type: [String],
      enum: ["content_view", "content_add", "content_edit", "content_delete","users_view", "users_add", "users_edit", "users_delete","role_view", "role_add", "role_edit", "role_delete",],
      default: ["content_view"],
    },

    rolestatus: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

////// post ////

const Post = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AdminModel =
  mongoose.models.admin_Users || mongoose.model("admin_Users", AdminUsers);

export const AdminRoleModel =
  mongoose.models.admin_Role || mongoose.model("admin_Role", AdminRole);

export const PostModel = mongoose.models.post || mongoose.model("post", Post);
