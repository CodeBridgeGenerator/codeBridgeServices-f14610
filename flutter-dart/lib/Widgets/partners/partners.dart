import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Partners {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? userId;
	 
	@HiveField(2)
	final String? name;
	 
	@HiveField(3)
	final String? email;
	 
	@HiveField(4)
	final bool? isActive;
	 

  Partners({
    this.id,
		this.userId,
		this.name,
		this.email,
		this.isActive
  });

  factory Partners.fromJson(Map<String, dynamic> map) {
    return Partners(
      id: map['_id'] as String?,
			map['userId'] != null ? userId : map['userId'] as String : "",
			map['name'] != null ? name : map['name'] as String : "",
			map['email'] != null ? email : map['email'] as String : "",
			isActive : map['isActive'] as bool
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'isActive' : isActive
    };
}

  @override
  String toString() => 'Partners('_id' : $id,"userId": $userId,"name": $name,"email": $email,"isActive": $isActive)';
}