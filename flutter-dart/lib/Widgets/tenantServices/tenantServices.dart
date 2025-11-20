import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class TenantServices {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? tenantId;
	 
	@HiveField(2)
	final String? paymentId;
	 
	@HiveField(3)
	final String? serviceId;
	 
	@HiveField(4)
	final String? paymentStatus;
	 
	@HiveField(5)
	final String? apiKey;
	 
	@HiveField(6)
	final bool? isActive;
	 

  TenantServices({
    this.id,
		this.tenantId,
		this.paymentId,
		this.serviceId,
		this.paymentStatus,
		this.apiKey,
		this.isActive
  });

  factory TenantServices.fromJson(Map<String, dynamic> map) {
    return TenantServices(
      id: map['_id'] as String?,
			map['tenantId'] != null ? tenantId : map['tenantId'] as String : "",
			map['paymentId'] != null ? paymentId : map['paymentId'] as String : "",
			map['serviceId'] != null ? serviceId : map['serviceId'] as String : "",
			map['paymentStatus'] != null ? paymentStatus : map['paymentStatus'] as String : "",
			map['apiKey'] != null ? apiKey : map['apiKey'] as String : "",
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
  String toString() => 'TenantServices('_id' : $id,"tenantId": $tenantId,"paymentId": $paymentId,"serviceId": $serviceId,"paymentStatus": $paymentStatus,"apiKey": $apiKey,"isActive": $isActive)';
}