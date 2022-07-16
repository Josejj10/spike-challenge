# Generated by Django 4.0.6 on 2022-07-16 16:45

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('bbox', django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), size=4)),
            ],
        ),
        migrations.CreateModel(
            name='AddressGeometry',
            fields=[
                ('auto_increment_id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=20)),
                ('coordinates', django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), size=2)),
            ],
        ),
        migrations.CreateModel(
            name='AddressProperties',
            fields=[
                ('auto_increment_id', models.AutoField(primary_key=True, serialize=False)),
                ('place_id', models.BigIntegerField()),
                ('osm_type', models.CharField(max_length=20)),
                ('osm_id', models.CharField(max_length=20)),
                ('display_name', models.CharField(max_length=400)),
                ('place_rank', models.IntegerField()),
                ('category', models.CharField(max_length=20)),
                ('type', models.CharField(max_length=20)),
                ('importance', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='DistanceQuery',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('distance', models.FloatField()),
                ('time', models.DateTimeField()),
                ('address_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.address')),
                ('address_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.address')),
            ],
        ),
        migrations.AddField(
            model_name='address',
            name='geometry',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.addressgeometry'),
        ),
        migrations.AddField(
            model_name='address',
            name='properties',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.addressproperties'),
        ),
    ]