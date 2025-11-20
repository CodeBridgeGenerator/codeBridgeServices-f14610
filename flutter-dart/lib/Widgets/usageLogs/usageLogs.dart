import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class UsageLogs {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? tenantServices;
	 
	@HiveField(2)
	final String? apiKey;
	 
	@HiveField(3)
	final String? requestId;
	 
	@HiveField(4)
	final int? unitsConsumed;
	 
	@HiveField(5)
	final int? unitRate;
	 
	@HiveField(6)
	final int? cost;
	 
	@HiveField(7)
	final String? metaData;
	 
	@HiveField(8)
	final DateTime? dateOfUsage;
	 

  UsageLogs({
    this.id,
		this.tenantServices,
		this.apiKey,
		this.requestId,
		this.unitsConsumed,
		this.unitRate,
		this.cost,
		this.metaData,
		this.dateOfUsage
  });

  factory UsageLogs.fromJson(Map<String, dynamic> map) {
    return UsageLogs(
      id: map['_id'] as String?,
			map['tenantServices'] != null ? tenantServices : map['tenantServices'] as String : "",
			map['apiKey'] != null ? apiKey : map['apiKey'] as String : "",
			map['requestId'] != null ? requestId : map['requestId'] as String : "",
			unitsConsumed : map['unitsConsumed'] as int,
			unitRate : map['unitRate'] as int,
			cost : map['cost'] as int,
			map['metaData'] != null ? metaData : map['metaData'] as String : "",
			map['dateOfUsage'] != null ? DateTime.parse(map['dateOfUsage']) : null
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'unitsConsumed' : unitsConsumed,
			'unitRate' : unitRate,
			'cost' : cost,
			'dateOfUsage' : dateOfUsage?.toIso8601String()
    };
}

  @override
  String toString() => 'UsageLogs('_id' : $id,"tenantServices": $tenantServices,"apiKey": $apiKey,"requestId": $requestId,"unitsConsumed": $unitsConsumed,"unitRate": $unitRate,"cost": $cost,"metaData": $metaData,"dateOfUsage": ${dateOfUsage?.toIso8601String()})';
}