import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Workspaces {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? ownerId;
	 
	@HiveField(2)
	final String? name;
	 
	@HiveField(3)
	final bool? isDefault;
	 

  Workspaces({
    this.id,
		this.ownerId,
		this.name,
		this.isDefault
  });

  factory Workspaces.fromJson(Map<String, dynamic> map) {
    return Workspaces(
      id: map['_id'] as String?,
			map['ownerId'] != null ? ownerId : map['ownerId'] as String : "",
			map['name'] != null ? name : map['name'] as String : "",
			isDefault : map['isDefault'] as bool
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'isDefault' : isDefault
    };
}

  @override
  String toString() => 'Workspaces('_id' : $id,"ownerId": $ownerId,"name": $name,"isDefault": $isDefault)';
}