import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class WorkspaceMembers {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? workspaceId;
	 
	@HiveField(2)
	final String? userId;
	 
	@HiveField(3)
	final String? role;
	 

  WorkspaceMembers({
    this.id,
		this.workspaceId,
		this.userId,
		this.role
  });

  factory WorkspaceMembers.fromJson(Map<String, dynamic> map) {
    return WorkspaceMembers(
      id: map['_id'] as String?,
			map['workspaceId'] != null ? workspaceId : map['workspaceId'] as String : "",
			map['userId'] != null ? userId : map['userId'] as String : "",
			map['role'] != null ? role : map['role'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id
    };
}

  @override
  String toString() => 'WorkspaceMembers('_id' : $id,"workspaceId": $workspaceId,"userId": $userId,"role": $role)';
}