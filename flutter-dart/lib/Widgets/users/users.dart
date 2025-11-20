import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Users {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? name;
	 
	@HiveField(2)
	final String? email;
	 
	@HiveField(3)
	final bool? status;
	 
	@HiveField(4)
	final String? password;
	 
	@HiveField(5)
	final bool? remember_token;
	 
	@HiveField(6)
	final String? email_verified_at;
	 

  Users({
    this.id,
		this.name,
		this.email,
		this.status,
		this.password,
		this.remember_token,
		this.email_verified_at
  });

  factory Users.fromJson(Map<String, dynamic> map) {
    return Users(
      id: map['_id'] as String?,
			map['name'] != null ? name : map['name'] as String : "",
			map['email'] != null ? email : map['email'] as String : "",
			status : map['status'] as bool,
			map['password'] != null ? password : map['password'] as String : "",
			remember_token : map['remember_token'] as bool,
			map['email_verified_at'] != null ? email_verified_at : map['email_verified_at'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'status' : status,
			'remember_token' : remember_token
    };
}

  @override
  String toString() => 'Users('_id' : $id,"name": $name,"email": $email,"status": $status,"password": $password,"remember_token": $remember_token,"email_verified_at": $email_verified_at)';
}