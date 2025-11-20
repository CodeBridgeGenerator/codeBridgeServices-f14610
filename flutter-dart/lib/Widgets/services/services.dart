import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Services {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? name;
	 
	@HiveField(2)
	final String? description;
	 
	@HiveField(3)
	final int? initialPrice;
	 
	@HiveField(4)
	final String? metricName;
	 
	@HiveField(5)
	final String? metricUnit;
	 
	@HiveField(6)
	final int? ratePerUnit;
	 
	@HiveField(7)
	final bool? isActive;
	 
	@HiveField(8)
	final String? calculationFn;
	 

  Services({
    this.id,
		this.name,
		this.description,
		this.initialPrice,
		this.metricName,
		this.metricUnit,
		this.ratePerUnit,
		this.isActive,
		this.calculationFn
  });

  factory Services.fromJson(Map<String, dynamic> map) {
    return Services(
      id: map['_id'] as String?,
			map['name'] != null ? name : map['name'] as String : "",
			map['description'] != null ? description : map['description'] as String : "",
			initialPrice : map['initialPrice'] as int,
			map['metricName'] != null ? metricName : map['metricName'] as String : "",
			map['metricUnit'] != null ? metricUnit : map['metricUnit'] as String : "",
			ratePerUnit : map['ratePerUnit'] as int,
			isActive : map['isActive'] as bool,
			map['calculationFn'] != null ? calculationFn : map['calculationFn'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'initialPrice' : initialPrice,
			'ratePerUnit' : ratePerUnit,
			'isActive' : isActive
    };
}

  @override
  String toString() => 'Services('_id' : $id,"name": $name,"description": $description,"initialPrice": $initialPrice,"metricName": $metricName,"metricUnit": $metricUnit,"ratePerUnit": $ratePerUnit,"isActive": $isActive,"calculationFn": $calculationFn)';
}