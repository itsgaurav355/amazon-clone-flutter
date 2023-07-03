import 'package:amazon_clone/features/admin/models/sales.dart';
import 'package:charts_flutter_new/flutter.dart';
import 'package:flutter/material.dart';

class CategoryProductsChart extends StatelessWidget {
  final List<Series<Sales, String>> seriesList;
  const CategoryProductsChart({super.key, required this.seriesList});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      seriesList,
      animate: true,
    );
  }
}
