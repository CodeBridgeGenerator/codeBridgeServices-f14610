import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class PartnerInvoices {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? partnerId;
	 
	@HiveField(2)
	final String? paymentId;
	 
	@HiveField(3)
	final DateTime? period;
	 
	@HiveField(4)
	final String? totalAmount;
	 
	@HiveField(5)
	final String? paymentStatus;
	 
	@HiveField(6)
	final String? tenantInvoices;
	 
	@HiveField(7)
	final DateTime? dueDate;
	 

  PartnerInvoices({
    this.id,
		this.partnerId,
		this.paymentId,
		this.period,
		this.totalAmount,
		this.paymentStatus,
		this.tenantInvoices,
		this.dueDate
  });

  factory PartnerInvoices.fromJson(Map<String, dynamic> map) {
    return PartnerInvoices(
      id: map['_id'] as String?,
			map['partnerId'] != null ? partnerId : map['partnerId'] as String : "",
			map['paymentId'] != null ? paymentId : map['paymentId'] as String : "",
			map['period'] != null ? DateTime.parse(map['period']) : null,
			map['totalAmount'] != null ? totalAmount : map['totalAmount'] as String : "",
			map['paymentStatus'] != null ? paymentStatus : map['paymentStatus'] as String : "",
			map['tenantInvoices'] != null ? tenantInvoices : map['tenantInvoices'] as String : "",
			map['dueDate'] != null ? DateTime.parse(map['dueDate']) : null
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'period' : period?.toIso8601String(),
			'dueDate' : dueDate?.toIso8601String()
    };
}

  @override
  String toString() => 'PartnerInvoices('_id' : $id,"partnerId": $partnerId,"paymentId": $paymentId,"period": ${period?.toIso8601String()},"totalAmount": $totalAmount,"paymentStatus": $paymentStatus,"tenantInvoices": $tenantInvoices,"dueDate": ${dueDate?.toIso8601String()})';
}