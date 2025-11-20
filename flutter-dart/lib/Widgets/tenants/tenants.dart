import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Tenants {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? partnerId;
	 
	@HiveField(2)
	final String? name;
	 
	@HiveField(3)
	final bool? isActive;
	 

  Tenants({
    this.id,
		this.partnerId,
		this.name,
		this.isActive
  });

  factory Tenants.fromJson(Map<String, dynamic> map) {
    return Tenants(
      id: map['_id'] as String?,
			map['partnerId'] != null ? partnerId : map['partnerId'] as String : "",
			map['name'] != null ? name : map['name'] as String : "",
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
  String toString() => 'Tenants('_id' : $id,"partnerId": $partnerId,"name": $name,"isActive": $isActive)';
}