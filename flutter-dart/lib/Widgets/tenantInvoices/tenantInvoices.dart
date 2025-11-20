import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class TenantInvoices {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? tenantId;
	 
	@HiveField(2)
	final DateTime? period;
	 
	@HiveField(3)
	final String? totalAmount;
	 
	@HiveField(4)
	final String? usageLogs;
	 
	@HiveField(5)
	final DateTime? generatedAt;
	 

  TenantInvoices({
    this.id,
		this.tenantId,
		this.period,
		this.totalAmount,
		this.usageLogs,
		this.generatedAt
  });

  factory TenantInvoices.fromJson(Map<String, dynamic> map) {
    return TenantInvoices(
      id: map['_id'] as String?,
			map['tenantId'] != null ? tenantId : map['tenantId'] as String : "",
			map['period'] != null ? DateTime.parse(map['period']) : null,
			map['totalAmount'] != null ? totalAmount : map['totalAmount'] as String : "",
			map['usageLogs'] != null ? usageLogs : map['usageLogs'] as String : "",
			map['generatedAt'] != null ? DateTime.parse(map['generatedAt']) : null
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'period' : period?.toIso8601String(),
			'generatedAt' : generatedAt?.toIso8601String()
    };
}

  @override
  String toString() => 'TenantInvoices('_id' : $id,"tenantId": $tenantId,"period": ${period?.toIso8601String()},"totalAmount": $totalAmount,"usageLogs": $usageLogs,"generatedAt": ${generatedAt?.toIso8601String()})';
}