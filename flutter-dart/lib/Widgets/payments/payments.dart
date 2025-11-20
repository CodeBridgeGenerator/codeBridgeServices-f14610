import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Payments {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? sessionId;
	 
	@HiveField(2)
	final String? paymentStatus;
	 
	@HiveField(3)
	final String? paymentType;
	 
	@HiveField(4)
	final int? amount;
	 
	@HiveField(5)
	final String? currency;
	 
	@HiveField(6)
	final String? paymentIntendId;
	 
	@HiveField(7)
	final DateTime? payedAt;
	 

  Payments({
    this.id,
		this.sessionId,
		this.paymentStatus,
		this.paymentType,
		this.amount,
		this.currency,
		this.paymentIntendId,
		this.payedAt
  });

  factory Payments.fromJson(Map<String, dynamic> map) {
    return Payments(
      id: map['_id'] as String?,
			map['sessionId'] != null ? sessionId : map['sessionId'] as String : "",
			map['paymentStatus'] != null ? paymentStatus : map['paymentStatus'] as String : "",
			map['paymentType'] != null ? paymentType : map['paymentType'] as String : "",
			amount : map['amount'] as int,
			map['currency'] != null ? currency : map['currency'] as String : "",
			map['paymentIntendId'] != null ? paymentIntendId : map['paymentIntendId'] as String : "",
			map['payedAt'] != null ? DateTime.parse(map['payedAt']) : null
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'amount' : amount,
			'payedAt' : payedAt?.toIso8601String()
    };
}

  @override
  String toString() => 'Payments('_id' : $id,"sessionId": $sessionId,"paymentStatus": $paymentStatus,"paymentType": $paymentType,"amount": $amount,"currency": $currency,"paymentIntendId": $paymentIntendId,"payedAt": ${payedAt?.toIso8601String()})';
}